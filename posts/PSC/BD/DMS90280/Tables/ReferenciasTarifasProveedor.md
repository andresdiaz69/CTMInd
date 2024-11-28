# Table: ReferenciasTarifasProveedor

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMR | nvarchar | NO |
| PkFkTarifas | tinyint | NO |
| PkFkReferencias | nvarchar | NO |
| PkFkTerceros | int | NO |
| Precio | decimal | NO |
| DtoPorc | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PkReferenciasTarifasProveedor_Iden | int | NO |
| PedidoTipoCodigoMarca | nvarchar | YES |
