# Table: FacturacionImpuestosProforma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFacturaProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumFacturaProforma | nvarchar | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| FkCentros | smallint | NO |
| ImporteImpuesto | decimal | YES |
| PorcImpuesto | decimal | YES |
| Descripcion | nvarchar | YES |
| BaseImponible | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
