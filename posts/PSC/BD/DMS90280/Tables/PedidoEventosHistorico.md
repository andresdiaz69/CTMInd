# Table: PedidoEventosHistorico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkNumPedidoVN | nvarchar | NO |
| PkFkMarcas | smallint | NO |
| PkPedidoEventosHistorico_Iden | smallint | NO |
| FKPedidoEventos | nvarchar | NO |
| FechaEvento | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
