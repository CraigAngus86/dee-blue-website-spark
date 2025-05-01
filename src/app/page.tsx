// src/app/page.tsx (step 1 - testing Sanity connection)
import { fetchSanityData } from "@/lib/sanity/client";

// Test Sanity connection with a simple query
async function testSanityConnection() {
  try {
    // Simple query to test connection - fetch a few news articles
    const result = await fetchSanityData('*[_type == "newsArticle"][0...3] {_id, title}');
    console.log("Sanity connection successful:", result);
    return result;
  } catch (error) {
    console.error("Sanity connection error:", error);
    return null;
  }
}

export default async function HomePage() {
  // Test Sanity connection
  const sanityTest = await testSanityConnection();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Banks o' Dee FC</h1>
      <p className="mt-2">Debugging page</p>
      <p className="mt-4">Sanity connection: {sanityTest ? 'Success' : 'Failed'}</p>
      
      {/* Only show this section if Sanity connection worked */}
      {sanityTest && sanityTest.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Retrieved {sanityTest.length} news articles:</p>
          <ul className="mt-2 list-disc pl-5">
            {sanityTest.map((article: any) => (
              <li key={article._id}>{article.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
