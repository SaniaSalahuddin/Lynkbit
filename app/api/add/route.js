import clientPromise from '@/lib/mongodb'

export async function POST(request) {
  try {
    const body = await request.json();
    const handle = body.handle?.trim().toLowerCase();

    if (!handle) {
      return Response.json({
        success: false,
        error: true,
        message: "Handle is required.",
        result: null,
      });
    }

    const client = await clientPromise
    const db = client.db('Lynkbit')

    const data = await db.collection('tree');
    // normalize handle and prevent duplicate creation
    const doc = await data.findOne({ handle });
    if (doc) {
      return Response.json({
        success: false,
        error: true,
        message: "This Lynkbit already exists",
        result: null,
      });
    }

    const result = await data.insertOne({ ...body, handle });
    return Response.json({
      success: true,
      error: false,
      message: "Lynkbit created successfully!",
      result: result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: true,
      message: "Error occur",
      result: error.message,
    });
  }
}