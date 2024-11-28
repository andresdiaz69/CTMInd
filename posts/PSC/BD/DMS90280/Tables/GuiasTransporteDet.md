# Table: GuiasTransporteDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSeries_GuiasTransporte | nvarchar | NO |
| PkFkGuiasTransporte | int | NO |
| PkGuiasTransporteDet_Iden | smallint | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Unidades | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Descripcion | nvarchar | YES |
| PrecioVenta | decimal | YES |
