# Table: OfertasVOKits

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| FkGamas | smallint | YES |
| FkCodModelo_Like | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | YES |
| Descripcion | nvarchar | NO |
| ImporteTotal | decimal | NO |
| FkTarifas | smallint | YES |
| ImpMatriculacion | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkFkEmpresas_Kits | smallint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
