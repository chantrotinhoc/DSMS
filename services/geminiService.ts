
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: In a real application, this key would be managed securely and not hardcoded.
// We are using process.env.API_KEY as per the instructions.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might have a more graceful fallback or UI message.
  // For this context, throwing an error is sufficient to indicate a misconfiguration.
  console.error("API_KEY environment variable not set.");
  // A user-facing error could be shown here
  // For now, we'll let the app fail to initialize the service
  // to make the configuration issue obvious.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const serializeDiagram = (diagramData: { nodes: any[]; edges: any[] }): string => {
  const { nodes, edges } = diagramData;
  if (nodes.length === 0) {
    return "The diagram is currently empty.";
  }
  let description = "The IT infrastructure consists of the following components:\n";
  
  nodes.forEach(node => {
    description += `- Component ID ${node.id}: A '${node.name}' of type '${node.type}'.\n`;
    const properties = Object.entries(node.properties).filter(([, value]) => value);
    if (properties.length > 0) {
      description += "  With properties:\n";
      properties.forEach(([key, value]) => {
        description += `    - ${key}: ${value}\n`;
      });
    }
  });

  description += "\nThe components are connected as follows:\n";
  if (edges.length > 0) {
    edges.forEach(edge => {
      description += `- From component ID ${edge.source} to component ID ${edge.target}.\n`;
    });
  } else {
    description += "- There are no connections defined between the components.\n";
  }

  return description;
};

export async function generateSystemReport(diagramData: any) {
  const prompt = `
    You are an expert IT architect. Based on the following IT infrastructure data, generate a comprehensive system architecture report in Vietnamese.
    The report should include an executive summary, a detailed breakdown of each component and its configuration, an analysis of the network topology, and potential single points of failure.
    Format the output nicely using markdown-style headings.

    Infrastructure Data:
    ${serializeDiagram(diagramData)}
  `;

  return ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
  });
}

export async function getImprovementSuggestions(diagramData: any) {
  const prompt = `
    You are a senior IT security and performance consultant. Analyze the following IT infrastructure diagram.
    Provide actionable suggestions for improvement in these areas:
    1.  Security: Identify potential vulnerabilities and recommend solutions (e.g., missing firewalls, insecure configurations).
    2.  Redundancy & High Availability: Point out single points of failure and suggest solutions (e.g., load balancers, redundant servers, backup solutions).
    3.  Performance: Suggest potential bottlenecks and how to optimize them.

    Present your suggestions clearly in Vietnamese, using markdown for structure.

    Infrastructure Data:
    ${serializeDiagram(diagramData)}
  `;
  
  return ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
  });
}


export async function getTroubleshootingSteps(diagramData: any, problemDescription: string) {
  const prompt = `
    You are an expert IT support engineer. An administrator is facing an issue with their system.
    Provide a clear, step-by-step troubleshooting guide in Vietnamese to help them resolve the problem.
    Base your guide on the provided system architecture and the problem description. Start with the most likely causes.

    Problem Description:
    "${problemDescription}"

    System Architecture:
    ${serializeDiagram(diagramData)}
  `;

  return ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } } // Low latency for interactive help
  });
}
