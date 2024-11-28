# Table: FacturacionCambioTercero

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkNumFactura | nvarchar | NO |
| PkFacturacionCambioTercero | datetime | NO |
| FkTerceros_Old | int | NO |
| FkTerceros_New | int | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
