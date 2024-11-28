# Table: PedidosEspecificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkNumPedidoVN | nvarchar | NO |
| PkFkMarcas | smallint | NO |
| PkFkEspecificacionesTipos | smallint | NO |
| ValorEspecificacion | nvarchar | NO |
| Importado | bit | NO |
| Modificado | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ValorEspecificacionExterno | nvarchar | YES |
