# Table: PresupuestoImpuestosProforma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura_Proforma | nvarchar | NO |
| PkFkSeries_FacturaProforma | nvarchar | NO |
| PkFkNumFactura_Proforma | nvarchar | NO |
| PkFkImpuestoTipos | nvarchar | NO |
| PkFkImpuestos | nvarchar | NO |
| ImporteImpuesto | decimal | YES |
| PorcImpuesto | decimal | YES |
| Descripcion | nvarchar | YES |
| BaseImponible | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
