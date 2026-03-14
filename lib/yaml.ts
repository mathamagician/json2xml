import jsYaml from "js-yaml";
import { xmlToJson, jsonToXml } from "./converter";

export function jsonToYaml(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }
  return jsYaml.dump(parsed, { indent: 2, lineWidth: -1, noRefs: true });
}

export function yamlToJson(yamlText: string): string {
  let parsed: unknown;
  try {
    parsed = jsYaml.load(yamlText);
  } catch (e) {
    throw new Error(`Invalid YAML — ${(e as Error).message}`);
  }
  return JSON.stringify(parsed, null, 2);
}

export function xmlToYaml(xmlText: string): string {
  const jsonText = xmlToJson(xmlText);
  const parsed = JSON.parse(jsonText);
  return jsYaml.dump(parsed, { indent: 2, lineWidth: -1, noRefs: true });
}

export function yamlToXml(yamlText: string): string {
  let parsed: unknown;
  try {
    parsed = jsYaml.load(yamlText);
  } catch (e) {
    throw new Error(`Invalid YAML — ${(e as Error).message}`);
  }
  const jsonText = JSON.stringify(parsed);
  return jsonToXml(jsonText);
}
