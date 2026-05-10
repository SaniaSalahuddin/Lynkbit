import clientPromise from '@/lib/mongodb'

export async function POST(request) {
  try {
    const body = await request.json();
    const handle = body.handle?.trim().toLowerCase();

    if (!handle) {
      return Response.json({
        exists: false,
        error: true,
        message: "Handle is required.",
      });
    }

    const client = await clientPromise
    const db = client.db('Lynkbit')

    const data = await db.collection('tree');
    const doc = await data.findOne({ handle });

    return Response.json({
      exists: !!doc,
      error: false,
      message: doc ? "Handle exists" : "Handle not found",
    });
  } catch (error) {
    return Response.json({
      exists: false,
      error: true,
      message: "Error checking handle",
      result: error.message,
    });
  }
}
