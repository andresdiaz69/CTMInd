# Table: InventarioDetalladoSemanal

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PkFkSecciones | int | NO |
| PkFkUbicaciones | nvarchar | NO |
| PkFechaInventario | datetime | NO |
| Stock | decimal | NO |
| PrecioMedio | decimal | NO |
| PrecioCompra | decimal | NO |
| PrecioVenta | decimal | NO |
| FkClasificacion1 | nvarchar | NO |
| FkClasificacion2 | nvarchar | YES |
| ValorMedioReservadoSeccion | decimal | NO |
| FkTarifas | tinyint | NO |
| PrecioMedioPorEmpresa | decimal | YES |
| UnidadesPtesConfirmar | decimal | NO |
| FactorCambioPMContravalor | decimal | YES |
| ValorUnidadesPtesConfirmar | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
