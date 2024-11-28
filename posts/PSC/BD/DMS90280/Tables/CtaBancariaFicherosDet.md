# Table: CtaBancariaFicherosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCtaBancarias | smallint | NO |
| PkFkCtaBancariaFicheros | int | NO |
| PkCtaBancariaFicherosDet_Iden | smallint | NO |
| Conciliado | bit | YES |
| ImporteDebe | decimal | YES |
| ImporteHaber | decimal | YES |
| FkMonedas | smallint | YES |
| FechaOperacion | datetime | YES |
| FechaValor | datetime | YES |
| NumCuenta | nvarchar | YES |
| CodTransaccion | nvarchar | YES |
| NumOperacion | nvarchar | YES |
| Operacion | nvarchar | YES |
| Documento | nvarchar | YES |
| FacturaEnlazada | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SaldoBanco | decimal | YES |
