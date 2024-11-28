# Table: PedidoTipoCompras

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkPedidoTipoCompras_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| GeneraFichero | bit | NO |
| Generico | bit | NO |
| FkPedidoTipos | nvarchar | NO |
| CodigoMarca | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPartidaArancelaria | nvarchar | YES |
