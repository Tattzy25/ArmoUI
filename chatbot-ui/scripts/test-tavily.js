// Test script for Tavily search API
const testTavilySearch = async () => {
  const baseUrl = 'http://localhost:3000'
  
  console.log('Testing Tavily Search API...\n')
  
  // Test 1: Basic Search
  console.log('1. Testing Basic Search:')
  try {
    const basicResponse = await fetch(`${baseUrl}/api/chat/tools/tavily-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'latest AI news',
        search_depth: 'basic',
        max_results: 2
      })
    })
    
    const basicData = await basicResponse.json()
    console.log('✅ Basic search successful')
    console.log(`   Query: ${basicData.query}`)
    console.log(`   Results: ${basicData.results?.length || 0}`)
    console.log(`   Response time: ${basicData.response_time}s`)
    console.log('')
  } catch (error) {
    console.log('❌ Basic search failed:', error.message)
  }
  
  // Test 2: Advanced Search
  console.log('2. Testing Advanced Search:')
  try {
    const advancedResponse = await fetch(`${baseUrl}/api/chat/tools/tavily-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'how to configure tavily api',
        search_depth: 'advanced',
        include_answer: 'advanced',
        max_results: 3,
        include_images: true,
        include_image_descriptions: true
      })
    })
    
    const advancedData = await advancedResponse.json()
    console.log('✅ Advanced search successful')
    console.log(`   Query: ${advancedData.query}`)
    console.log(`   Results: ${advancedData.results?.length || 0}`)
    console.log(`   Has answer: ${!!advancedData.answer}`)
    console.log(`   Response time: ${advancedData.response_time}s`)
    if (advancedData.answer) {
      console.log(`   Answer preview: ${advancedData.answer.substring(0, 100)}...`)
    }
    console.log('')
  } catch (error) {
    console.log('❌ Advanced search failed:', error.message)
  }
  
  console.log('🎉 Tavily Search API testing complete!')
}

// Run the test
testTavilySearch().catch(console.error) 