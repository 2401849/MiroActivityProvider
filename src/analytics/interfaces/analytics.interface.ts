export interface Metric {
  name: string;
  type: string;
  value?: unknown;
}

export type QualitativeMetric = Omit<Metric, "value"> & {
  name: "elements_created_at" | "elements_content";
  type: "application/json";
};

export type QuantitativeMetric = Omit<Metric, "value"> & {
  name: "elements_count";
  type: "integer";
};

export type QualitativeMetricWithValue = Metric & {
  name: "elements_created_at" | "elements_content";
  type: "application/json";
  value: Object;
};

export type QuantitativeMetricWithValue = Metric & {
  name: "elements_count";
  type: "integer";
  value: number;
};

export interface AnalyticsContract {
  qualAnalytics: QualitativeMetric[];
  quantAnalytics: QuantitativeMetric[];
}

export interface AnalyticsActivity {
  inveniraStdID: string;
  qualAnalytics: QualitativeMetricWithValue[];
  quantAnalytics: QuantitativeMetricWithValue[];
}
