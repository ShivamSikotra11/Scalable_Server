import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration options
export const options = {
  vus: 1000, // Number of Virtual Users
  duration: '120s', // Duration of the test
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% requests should fail
  },
};

// API base URL
const BASE_URL = 'http://localhost:3000'; // Update if using a different host/port

export default function () {
  // Request payload
  const payload = JSON.stringify({
    title: 'My First Post',
    content: 'This is the content of the first post.',
  });

  // Request headers
  const headers = { 'Content-Type': 'application/json' };

  // Send POST request
  const res = http.post(`${BASE_URL}/create-post`, payload, { headers });

  // Validate the response
  const success = check(res, {
    'Status is 201': (r) => r.status === 201, // Expecting HTTP 201 Created
    'Response has message': (r) =>
      r.json('message') === 'Post created', // Validate response body
  });

  if (!success) {
    console.error(`Request failed: ${res.body}`);
  }

  // Simulate user wait time
  sleep(1);
}

// export function handleSummary(data) {
//   return {
//     'summary.json': JSON.stringify(data), // Save results to a file
//   };
// }
