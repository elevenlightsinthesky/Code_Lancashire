// This file contains mock data that simulates what we would get from ONS APIs
// In a production app, this would be replaced with real API calls

export function getMockData(dataType, companyContext) {
    switch (dataType) {
      case 'recruitment':
        return getRecruitmentData(companyContext);
      case 'skills':
        return getSkillsData(companyContext);
      case 'regions':
        return getRegionalData(companyContext);
      case 'demographics':
        return getDemographicData(companyContext);
      default:
        return getGeneralData(companyContext);
    }
  }
  
  function getRecruitmentData(companyContext) {
    // Mock data for workforce trends
    const industries = {
      'Technology': {
        growthRate: 0.08, // 8% annual growth
        skillShortage: 0.15, // 15% shortage for required skills
        competitionIndex: 0.8 // High competition index (0-1)
      },
      'Finance': {
        growthRate: 0.04,
        skillShortage: 0.10,
        competitionIndex: 0.7
      },
      'Healthcare': {
        growthRate: 0.11,
        skillShortage: 0.22,
        competitionIndex: 0.65
      },
      'Retail': {
        growthRate: 0.02,
        skillShortage: 0.05,
        competitionIndex: 0.4
      }
    };
  
    const locations = {
      'London': {
        workforceGrowth: 0.03,
        salaryPremium: 0.25, // 25% higher than national average
        costIndex: 0.9 // Very high cost index (0-1)
      },
      'Manchester': {
        workforceGrowth: 0.06,
        salaryPremium: 0.10,
        costIndex: 0.6
      },
      'Birmingham': {
        workforceGrowth: 0.04,
        salaryPremium: 0.08,
        costIndex: 0.55
      },
      'Edinburgh': {
        workforceGrowth: 0.05,
        salaryPremium: 0.12,
        costIndex: 0.65
      }
    };
  
    const industry = industries[companyContext.industry] || industries['Technology'];
    const location = locations[companyContext.location] || locations['London'];
    
    // Calculate workforce projection for the next 5 years
    const baseWorkforceIndex = 100;
    const years = [2025, 2026, 2027, 2028, 2029];
    
    const workforceProjection = years.map((year, index) => {
      // Compound growth calculation
      return Math.round(baseWorkforceIndex * Math.pow(1 + location.workforceGrowth, index));
    });
    
    // Calculate demand projection
    const demandProjection = years.map((year, index) => {
      // Demand grows faster than workforce in high-growth industries
      return Math.round(baseWorkforceIndex * Math.pow(1 + industry.growthRate, index));
    });
    
    // Calculate talent gap
    const talentGapProjection = demandProjection.map((demand, index) => {
      return demand - workforceProjection[index];
    });
    
    return {
      years,
      workforceProjection,
      demandProjection,
      talentGapProjection,
      industry,
      location
    };
  }
  
  function getSkillsData(companyContext) {
    // Mock data for skill trends
    const industry = companyContext.industry;
    
    const skillsByIndustry = {
      'Technology': ['Software Development', 'Cloud Computing', 'AI/ML', 'Cybersecurity', 'Data Analysis'],
      'Finance': ['Financial Analysis', 'Risk Management', 'Blockchain', 'Compliance', 'Data Science'],
      'Healthcare': ['Patient Care', 'Medical Technology', 'Healthcare IT', 'Regulatory Compliance', 'Telehealth'],
      'Retail': ['E-commerce', 'Supply Chain', 'Customer Experience', 'Digital Marketing', 'Data Analysis']
    };
    
    const growthRatesByIndustry = {
      'Technology': [0.1, 0.15, 0.2, 0.18, 0.17],
      'Finance': [0.08, 0.1, 0.15, 0.09, 0.14],
      'Healthcare': [0.07, 0.12, 0.14, 0.08, 0.16],
      'Retail': [0.12, 0.09, 0.11, 0.13, 0.1]
    };
    
    const skills = skillsByIndustry[industry] || skillsByIndustry['Technology'];
    const growthRates = growthRatesByIndustry[industry] || growthRatesByIndustry['Technology'];
    
    const years = [2025, 2026, 2027, 2028, 2029];
    
    // Generate growth projections for each skill
    const skillProjections = skills.map((skill, skillIndex) => {
      const growthRate = growthRates[skillIndex];
      
      return {
        skill,
        projections: years.map((year, yearIndex) => {
          return Math.round(100 * Math.pow(1 + growthRate, yearIndex));
        })
      };
    });
    
    return {
      years,
      skills,
      skillProjections
    };
  }
  
  function getRegionalData(companyContext) {
    // Mock data for regional growth
    const industry = companyContext.industry;
    
    const regions = ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds', 'Glasgow'];
    
    const growthIndicesByIndustry = {
      'Technology': [1.05, 1.12, 1.07, 1.09, 1.15, 1.14, 1.08],
      'Finance': [1.08, 1.05, 1.04, 1.10, 1.06, 1.04, 1.07],
      'Healthcare': [1.06, 1.09, 1.10, 1.08, 1.07, 1.12, 1.09],
      'Retail': [1.03, 1.07, 1.06, 1.04, 1.08, 1.06, 1.05]
    };
    
    const indices = growthIndicesByIndustry[industry] || growthIndicesByIndustry['Technology'];
    
    // Calculate opportunity score (combination of growth, cost, and talent availability)
    const opportunityScores = regions.map((region, index) => {
      // This would be a more complex calculation in reality
      return Math.round(indices[index] * 100);
    });
    
    return {
      regions,
      indices,
      opportunityScores
    };
  }
  
  function getDemographicData(companyContext) {
    // Mock data for demographic trends
    const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    
    // Current (2025) age distribution percentages
    const currentDistribution = [15, 28, 25, 20, 10, 2];
    
    // 2028 projected distribution
    const projectedDistribution = [16, 32, 26, 16, 8, 2];
    
    // Change in percentage points
    const changeInPoints = ageGroups.map((group, index) => {
      return projectedDistribution[index] - currentDistribution[index];
    });
    
    // Projected working population change by location
    const locationChanges = {
      'London': 0.05, // 5% growth
      'Manchester': 0.08,
      'Birmingham': 0.04,
      'Edinburgh': 0.06
    };
    
    const locationChange = locationChanges[companyContext.location] || locationChanges['London'];
    
    return {
      ageGroups,
      currentDistribution,
      projectedDistribution,
      changeInPoints,
      locationChange
    };
  }
  
  function getGeneralData(companyContext) {
    // General business trend data
    const years = [2025, 2026, 2027, 2028, 2029];
    
    const growthByIndustry = {
      'Technology': [1.00, 1.05, 1.12, 1.20, 1.28],
      'Finance': [1.00, 1.03, 1.07, 1.12, 1.18],
      'Healthcare': [1.00, 1.06, 1.13, 1.21, 1.30],
      'Retail': [1.00, 1.02, 1.05, 1.08, 1.12]
    };
    
    const industry = companyContext.industry;
    const growthProjection = growthByIndustry[industry] || growthByIndustry['Technology'];
    
    return {
      years,
      growthProjection
    };
  }