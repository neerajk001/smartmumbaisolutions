// Utility function to format numbers consistently (prevents hydration errors)
export const formatCurrency = (value: number): string => {
  // Use 'en-IN' for Indian numbering system (lakhs, crores)
  // This ensures consistent formatting on server and client
  return value.toLocaleString('en-IN');
};
 // 
// Additional utility to format numbers with currency symbol
export const formatCurrencyWithSymbol = (value: number): string => {
  return `₹${formatCurrency(value)}`;
};         
   
// Format percentage values 
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};




