// Utility functions for analyzing trend data

export function analyzeRecruitmentTrends(data, companyContext) {
    const { 
      years, 
      workforceProjection, 
      demandProjection, 
      talentGapProjection
    } = data;
    
    // Calculate the percentage gap (with validation)
    let finalYearGapPercentage = 0;
    if (Array.isArray(talentGapProjection) && Array.isArray(demandProjection) && 
        talentGapProjection.length > 0 && demandProjection.length > 0) {
      const lastIndex = Math.min(talentGapProjection.length, demandProjection.length) - 1;
      finalYearGapPercentage = Math.round(
        (talentGapProjection[lastIndex] / demandProjection[lastIndex]) * 100
      );
    }
    
    // Generate insights based on the data
    let insights = '';
    const finalYear = years && years.length > 0 ? years[years.length - 1] : '2029';
    
    if (finalYearGapPercentage > 15) {
      insights = `By ${finalYear}, the ${companyContext.industry} industry in ${companyContext.location} is projected to face a severe talent gap of approximately ${finalYearGapPercentage}%. Companies should consider aggressive recruitment strategies, remote work options, and investing in training programs.`;
    } else if (finalYearGapPercentage > 5) {
      insights = `By ${finalYear}, the ${companyContext.industry} industry in ${companyContext.location} is projected to face a moderate talent gap of approximately ${finalYearGapPercentage}%. Companies should consider expanding their recruitment areas and offering competitive compensation packages.`;
    } else if (finalYearGapPercentage > 0) {
      insights = `By ${finalYear}, the ${companyContext.industry} industry in ${companyContext.location} is projected to face a small talent gap of approximately ${finalYearGapPercentage}%. This is manageable with proactive recruitment planning.`;
    } else {
      insights = `By ${finalYear}, the ${companyContext.industry} industry in ${companyContext.location} is projected to have sufficient talent available. Companies should focus on quality of hires rather than quantity.`;
    }
    
    // Create chart data
    const chartData = {
      title: `${companyContext.industry} Workforce Projection in ${companyContext.location}`,
      labels: Array.isArray(years) ? years.map(String) : ['2025', '2026', '2027', '2028', '2029'],
      datasets: [
        {
          label: 'Workforce Supply',
          data: workforceProjection || [100, 105, 110, 115, 120],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Workforce Demand',
          data: demandProjection || [100, 108, 118, 130, 142],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
    
    return {
      responseText: insights,
      chartData
    };
  }
  
  // Additional analysis functions could be added here for other question types