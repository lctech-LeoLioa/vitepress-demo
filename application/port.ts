import type { ApeaToolsMethods, JKTalkMethods, PanCoreMethods, PanCpmiMethods, PanToolsMethods, PayMethods, PointMethods, RunMode } from "@lctech-tw/f2e-cat";
import type { ComputedRef, Ref } from "vue";

export interface UseCatRes {
  runMode: Readonly<Ref<RunMode, RunMode>>;
  accessToken: Readonly<Ref<string, string>>;
  isLogin: ComputedRef<boolean>;
  point: () => PointMethods;
  jktalk: () => JKTalkMethods;
  pay: () => PayMethods;
  panCore: () => PanCoreMethods;
  panTools: () => PanToolsMethods;
  panCpmi: () => PanCpmiMethods;
  apeaTools: () => ApeaToolsMethods;
}