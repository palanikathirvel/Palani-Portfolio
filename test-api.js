// Test script to verify API endpoints
// Run with: node test-api.js

const API_URL = 'http://localhost:5000/api';

const testAPIs = async () => {
  console.log('Testing Portfolio API Endpoints...\n');

  try {
    // Test Health Check
    console.log('1. Health Check');
    const healthRes = await fetch('http://localhost:5000/api/health');
    console.log('✓ API is running:', await healthRes.json());

    // Test Projects API
    console.log('\n2. Testing Projects API');
    
    // Create a project
    const createProjectRes = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Project',
        description: 'A test project with MongoDB',
        technologies: ['React', 'MongoDB'],
        links: { github: 'https://github.com/test' },
        featured: true
      })
    });
    const newProject = await createProjectRes.json();
    console.log('✓ Project created:', newProject._id);
    const projectId = newProject._id;

    // Get all projects
    const getProjectsRes = await fetch(`${API_URL}/projects`);
    const projects = await getProjectsRes.json();
    console.log(`✓ Retrieved ${projects.length} projects`);

    // Update project
    const updateProjectRes = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated Test Project',
        description: 'Updated description'
      })
    });
    console.log('✓ Project updated:', (await updateProjectRes.json()).title);

    // Delete project
    const deleteProjectRes = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    });
    console.log('✓ Project deleted');

    // Test Skills API
    console.log('\n3. Testing Skills API');
    const skillRes = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'React',
        category: 'Frontend',
        proficiency: 90
      })
    });
    const skill = await skillRes.json();
    console.log('✓ Skill created:', skill.name);

    // Test Achievements API
    console.log('\n4. Testing Achievements API');
    const achievementRes = await fetch(`${API_URL}/achievements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Achievement',
        description: 'A test achievement',
        category: 'Coding'
      })
    });
    const achievement = await achievementRes.json();
    console.log('✓ Achievement created:', achievement.title);

    // Test Profile API
    console.log('\n5. Testing Profile API');
    const profileRes = await fetch(`${API_URL}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Palani Kathirvel P',
        description: 'Full Stack Developer',
        email: 'test@example.com'
      })
    });
    const profile = await profileRes.json();
    console.log('✓ Profile created/updated:', profile.name);

    console.log('\n✅ All API tests passed!');
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    console.log('\nMake sure:');
    console.log('1. MongoDB is running');
    console.log('2. Backend server is running on http://localhost:5000');
  }
};

testAPIs();
