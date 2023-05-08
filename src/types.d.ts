import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
declare const tables: readonly [
  {
    readonly name: "scores";
    readonly columns: readonly [
      {
        readonly name: "name";
        readonly type: "string";
      },
      {
        readonly name: "score";
        readonly type: "int";
      }
    ];
  }
];
export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type Scores = InferredTypes["scores"];
export type ScoresRecord = Scores & XataRecord;
export type DatabaseSchema = {
  scores: ScoresRecord;
};
declare const DatabaseClient: any;
export declare class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions);
}
export declare const getXataClient: () => XataClient;
export {};
