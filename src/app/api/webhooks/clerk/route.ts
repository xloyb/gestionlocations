import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/client';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local', { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;
  const userId = String(id);

  // Handle 'user.created' and 'user.updated' events
  if (eventType === 'user.created' || eventType === 'user.updated') {
    return await handleUserEvent(evt, eventType, userId);
  }

  return new Response('Unhandled event type', { status: 200 });
}

// Helper function to handle user creation or update
async function handleUserEvent(evt: WebhookEvent, eventType: string, userId: string) {
  try {
    // Check if evt.data is a UserJSON type and extract fields
    if (isUserJSON(evt.data)) {
      const email = evt.data.email_addresses?.[0]?.email_address || "no-email@example.com";
      const firstName = evt.data.first_name || "Unknown";
      const lastName = evt.data.last_name || "Unknown";
      const avatar = evt.data.image_url || '/img/noAvatar.png';
      const cover = '/img/noCover.png'; // Default cover image

      const userData = {
        id: userId,
        email,
        name: `${firstName} ${lastName}`,
        avatar,
        cover,
      };

      if (eventType === 'user.created') {
        await prisma.user.create({
          data: userData,
        });
      } else if (eventType === 'user.updated') {
        await prisma.user.update({
          where: { id: userId },
          data: userData,
        });
      }
    } else {
      console.error('User data is not in expected format');
      return new Response('User data is not in expected format', { status: 400 });
    }
  } catch (err) {
    console.error('Error processing user event:', err);
    return new Response('Failed to process user event', { status: 400 });
  }

  return new Response('', { status: 200 });
}

// Type guard to check if evt.data is a UserJSON type
function isUserJSON(data: any): data is UserJSON {
  return data && data.email_addresses && data.first_name && data.last_name && data.image_url;
}

// Type for UserJSON (can be imported from Clerk's SDK if needed)
interface UserJSON {
  email_addresses: { email_address: string }[];
  first_name: string;
  last_name: string;
  image_url: string;
}
