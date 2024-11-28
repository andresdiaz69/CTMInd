# Table: MovimientosAutomaticosEmpresas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas_Origen | smallint | NO |
| PkFkCentros_Origen | smallint | NO |
| PkFkSecciones_Origen | int | NO |
| PkFkTerceros | int | NO |
| PkFkPedidoTipos_Origen | nvarchar | NO |
| FkPedidoTipoVentas_Origen | smallint | NO |
| FkEmpresas_Dest | smallint | NO |
| FkCentros_Dest | smallint | NO |
| FkSecciones_Dest | int | NO |
| FkCompraTipos_Dest | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
