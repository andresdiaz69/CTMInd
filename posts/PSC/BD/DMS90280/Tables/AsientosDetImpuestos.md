# Table: AsientosDetImpuestos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkAsientosDetImpuestos_Iden | int | NO |
| FkImpuestos | nvarchar | NO |
| Porc | decimal | NO |
| Cuota | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkFechaECIDesde | datetime | NO |
| FkEmpresaCentroImpuestosDesdeHastaDet_NumDet | smallint | NO |
| FechaBaja | datetime | YES |
| FkLocalizacionImpuestos | tinyint | YES |
| FkTipoRetenciones | smallint | YES |
| FkRetenciones | smallint | YES |
| AfectaBaseImponible | bit | NO |
| CalculoSobreTotalFactura | bit | NO |
| FkContCtas | nvarchar | YES |
| AutoLiquidacion | bit | YES |
| FkImpuestoClasificaciones | nvarchar | YES |
| FkAñoAsiento_Retencion | nvarchar | YES |
| FkAsientos_Retencion | int | YES |
| FkEfectosNumDet | smallint | YES |
| Abonado | bit | NO |
| ImporteBase | decimal | YES |
| FkContCtasAutoliquidacion | nvarchar | YES |
| NoDeducible | bit | NO |
| PorcProrrata | decimal | YES |
| ImpuestoDependiente | bit | NO |
| Unidades | decimal | YES |
