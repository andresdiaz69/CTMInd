# Table: ProformasOpcionalesVNRelaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkProformas | int | NO |
| PkFkOpcionales_Origen | nvarchar | NO |
| PkFkOpcionalTipos_Origen | nvarchar | NO |
| PkFkOpcionales_Destino | nvarchar | NO |
| PkFkOpcionalTipos_Destino | nvarchar | NO |
| FkMarcas | smallint | NO |
| FkGamas | smallint | NO |
| FkCodModelo | nvarchar | NO |
| FkExtModelo | nvarchar | NO |
| FkAñoModelo | nvarchar | NO |
| FkVersiones | nvarchar | NO |
| FkTarifas | smallint | NO |
| FkOpcionalRelacionTipos | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Referencia | nvarchar | YES |
| CodigoMarca | nvarchar | YES |
| PrecioVenta | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PrecioUnitario | decimal | YES |
| Unidades | smallint | YES |
