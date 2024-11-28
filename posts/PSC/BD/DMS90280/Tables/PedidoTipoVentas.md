# Table: PedidoTipoVentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkPedidoTipoVentas_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Generico | bit | NO |
| FkPedidoTipos | nvarchar | NO |
| CodigoMarca | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkDocumentoEmitidoTipos | smallint | NO |
| GarantiasIMS | bit | NO |
| PorDefecto | bit | NO |
| VisibleWeb | bit | NO |
