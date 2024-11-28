# Table: IntegracionesFactura

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkIntegracionesFactura_Iden | smallint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkWebServicesTipos | nvarchar | YES |
| Descripcion | nvarchar | YES |
| IntegracionManual | bit | NO |
| ContabilizaAutomaticamente | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PermiteGuardarSinContabilizar | bit | YES |
| ConceptoAsientoPlantilla | bit | YES |
| ConceptoAsientoComoReferencia | bit | YES |
