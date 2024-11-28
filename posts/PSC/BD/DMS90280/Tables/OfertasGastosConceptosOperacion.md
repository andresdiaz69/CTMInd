# Table: OfertasGastosConceptosOperacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkCompraGastoAdicionalTipos | nvarchar | NO |
| PkFkCentros_CompraGastoAdicionalTiposConceptosOperacion | smallint | NO |
| PkFkPlantillasCalculo | nvarchar | NO |
| PkFkConceptosOperacion | nvarchar | NO |
| FkCentros_CompraGastoAdicionales | smallint | YES |
| FkCompraGastoAdicionales | int | YES |
| FkCompraGastoAdicionalDetalles | int | YES |
| FkAñoPedidosServicios | nvarchar | YES |
| FkSeriePedidosServicios | nvarchar | YES |
| FkPedidosServicios | int | YES |
| Importe | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PkOfertasGastosConceptosOperacion_Iden | smallint | NO |
