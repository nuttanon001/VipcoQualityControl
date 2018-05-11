export interface RequireQcSchedule {
  Filter?: string;
  ProjectMasterId?: number;
  Skip?: number;
  Take?: number;
  /// <summary>
  /// 1 : All Task Without cancel
  /// null or 2 : Wait and Process only
  /// </summary>
  Mode?: number;
  /// <summary>
  /// Filter user require maintenance
  /// </summary>
  Creator?: string;
  /// <summary>
  /// ItemMaintenance
  /// </summary>
  QuailtyControlId?: number;
  /// <summary>
  /// RequireMaintenance
  /// </summary>
  RequireQuailtyControlId?: number;
  /// <summary>
  /// WorkGroupMaintenanceId
  /// </summary>
  WorkGroupQuailtyControlId?: number;
  /// <summary>
  /// Start date
  /// </summary>
  SDate?: Date;
  /// <summary>
  /// End date
  /// </summary>
  EDate?: Date;
}
