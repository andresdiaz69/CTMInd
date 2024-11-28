# Table: CajasFacturasAnticiposDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkFkAñoFactura_Anticipo | nvarchar | NO |
| PkFkSeries_Anticipo | nvarchar | NO |
| PkFkNumFactura_Anticipo | nvarchar | NO |
| PkFkCentros_Anticipo | smallint | NO |
| FkPagoFormas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCajasAnuladosDet_Parcial | int | YES |
