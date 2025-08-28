#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the large course file
console.log('Reading course-details.json...');
const data = JSON.parse(fs.readFileSync('course-details.json', 'utf8'));

// Configuration
const CHUNK_SIZE = 5000;
const totalCourses = Object.keys(data.courses).length;
const numChunks = Math.ceil(totalCourses / CHUNK_SIZE);

console.log(`Total courses: ${totalCourses}`);
console.log(`Creating ${numChunks} chunks of ${CHUNK_SIZE} courses each...`);

// Convert courses object to array of entries
const courseEntries = Object.entries(data.courses);

// Create chunks
const chunks = [];
for (let i = 0; i < numChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, totalCourses);
  const chunkEntries = courseEntries.slice(start, end);
  
  // Convert back to object
  const chunkData = {
    metadata: {
      ...data.metadata,
      chunkNumber: i + 1,
      totalChunks: numChunks,
      coursesInChunk: chunkEntries.length,
      startIndex: start,
      endIndex: end - 1
    },
    courses: Object.fromEntries(chunkEntries)
  };
  
  chunks.push(chunkData);
}

// Write chunk files
console.log('Writing chunk files...');
chunks.forEach((chunk, index) => {
  const fileName = `course-details-chunk-${index + 1}.json`;
  fs.writeFileSync(fileName, JSON.stringify(chunk, null, 2));
  const fileSize = fs.statSync(fileName).size / (1024 * 1024);
  console.log(`Created ${fileName} (${fileSize.toFixed(2)} MB)`);
});

// Create an index file with metadata about all chunks
const indexData = {
  metadata: {
    ...data.metadata,
    totalChunks: numChunks,
    chunkSize: CHUNK_SIZE,
    files: chunks.map((_, i) => `course-details-chunk-${i + 1}.json`)
  }
};

fs.writeFileSync('course-details-index.json', JSON.stringify(indexData, null, 2));
console.log('Created course-details-index.json');

console.log('✅ Successfully split course-details.json into chunks!');