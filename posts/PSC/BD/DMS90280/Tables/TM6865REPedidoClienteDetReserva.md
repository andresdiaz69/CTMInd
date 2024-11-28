# Table: TM6865REPedidoClienteDetReserva

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoPedidoCliente | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkPedidoCliente | int | NO |
| PkFkPedidoClienteDet | int | NO |
| PkFkSecciones | int | NO |
| PkFkUbicaciones | nvarchar | NO |
| UnidadesReservadas | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaReserva | datetime | YES |
