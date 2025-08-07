import clientPromise from "@/lib/monogdb"


export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise;
    const db = client.db('linktree')
    const collection = db.collection('links')

    // if the handle is already claimed, you cannot crate the linktree
    const doc = await collection.findOne({handle: body.handle})

    if(doc) {
      return Response.json({ success: false, error: true, message: 'This Linktree already exists!', result: null })
    }

    const result = await collection.insertOne(body)
   
  return Response.json({ success: true,error:false, message: 'Your Linktree has been generated. Enjoy!', result: result })
}