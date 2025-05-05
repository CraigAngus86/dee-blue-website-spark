
// Placeholder for match cross-system functionality
// This file is created to fix import errors in cross-system utils

export async function getMatchById(id: string): Promise<any> {
  console.warn('getMatchById is not fully implemented');
  return { id };
}

export async function syncMatchToSanity(match: any): Promise<any> {
  console.warn('syncMatchToSanity is not fully implemented');
  return { id: match.id };
}

export default {
  getMatchById,
  syncMatchToSanity
};
