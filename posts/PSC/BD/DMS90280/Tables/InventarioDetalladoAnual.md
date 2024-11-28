# Table: InventarioDetalladoAnual

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSecciones | int | NO |
| PkFkUbicaciones | nvarchar | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PkFechaInventario | datetime | NO |
| Stock | decimal | NO |
| PrecioMedio | decimal | NO |
| PrecioCompra | decimal | NO |
| PrecioVenta | decimal | NO |
| FkClasificacion1 | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkClasificacion2 | nvarchar | YES |
| ValorMedioReservadoSeccion | decimal | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| PrecioMedioPorEmpresa | decimal | YES |
| UnidadesPtesConfirmar | decimal | NO |
| FactorCambioPMContravalor | decimal | YES |
| ValorUnidadesPtesConfirmar | decimal | YES |
