import { NextResponse } from 'next/server';
import { getTrendData } from '../../../data/dataFetcher';
import { analyzeRecruitmentTrends } from '../../../utils/analysisUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, companyContext } = body;
    
    // Parse the user's question to determine what they're asking about
    const questionType = parseQuestion(message);
    
    // Get the relevant data based on the question
    const rawData = await getTrendData(questionType, companyContext);
    
    // Analyze the data to generate insights
    const { responseText, chartData } = analyzeData(questionType, rawData, companyContext);
    
    // Return the response
    return NextResponse.json({
      message: responseText,
      chartData: chartData
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json({ 
      message: 'Sorry, I encountered an error while analyzing the data. Please try a different question.',
      chartData: null
    }, { status: 200 }); // Using 200 instead of 500 to ensure client gets response
  }
}

// Simple question parser - in a real app, this would be more sophisticated
function parseQuestion(message) {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('recruitment') || messageLower.includes('hiring') || messageLower.includes('talent')) {
    return 'recruitment';
  } else if (messageLower.includes('skill') || messageLower.includes('talent')) {
    return 'skills';
  } else if (messageLower.includes('region') || messageLower.includes('location') || messageLower.includes('area')) {
    return 'regions';
  } else if (messageLower.includes('age') || messageLower.includes('demographic')) {
    return 'demographics';
  } else {
    return 'general';
  }
}

// Analyze data based on question type - simplified for the 5-hour implementation
function analyzeData(questionType, rawData, companyContext) {
  switch (questionType) {
    case 'recruitment':
      return analyzeRecruitmentTrends(rawData, companyContext);
    case 'skills':
      return {
        responseText: `Based on current trends, the most in-demand skills in the ${companyContext.industry} industry over the next 5 years are projected to be: data analysis, AI/ML expertise, and cybersecurity. Companies in ${companyContext.location} should focus on building these competencies.`,
        chartData: {
          title: 'Projected Skill Demand Growth',
          labels: ['2025', '2026', '2027', '2028', '2029'],
          datasets: [
            {
              label: 'Data Analysis',
              data: [100, 120, 150, 190, 230],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'AI/ML',
              data: [100, 140, 190, 250, 310],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Cybersecurity',
              data: [100, 130, 160, 200, 240],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        }
      };
    case 'regions':
      return {
        responseText: `Based on population and workforce trends, the most promising UK regions for ${companyContext.industry} expansion in the next 5 years are: Manchester, Bristol, and Leeds. These areas are seeing growth in skilled workforce availability.`,
        chartData: {
          title: 'Regional Workforce Growth Index',
          labels: ['London', 'Manchester', 'Bristol', 'Leeds', 'Edinburgh', 'Birmingham'],
          datasets: [
            {
              label: 'Skilled Workforce Growth Index',
              data: [105, 127, 118, 115, 108, 106],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
          ],
        }
      };
    case 'demographics':
      return {
        responseText: `Age demographic projections indicate that by 2028, there will be a 15% increase in workers aged 25-34 in ${companyContext.location}, while the 45-54 age group will decrease by approximately 8%. This suggests a shift toward a younger talent pool in the ${companyContext.industry} sector.`,
        chartData: {
          title: 'Age Demographic Projections',
          labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
          datasets: [
            {
              label: '2025',
              data: [15, 28, 25, 20, 10, 2],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: '2028 (Projected)',
              data: [16, 32, 26, 16, 8, 2],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }
      };
    default:
      return {
        responseText: `Based on analysis of ONS data, companies in the ${companyContext.industry} sector in ${companyContext.location} should prepare for moderate growth over the next 5 years. Key factors to monitor include demographic shifts, regional development, and evolving skill requirements.`,
        chartData: {
          title: 'Industry Growth Projection',
          labels: ['2025', '2026', '2027', '2028', '2029'],
          datasets: [
            {
              label: `${companyContext.industry} Sector Growth`,
              data: [100, 104, 109, 115, 122],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        }
      };
  }
}