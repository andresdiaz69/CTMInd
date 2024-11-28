# Table: OfertasCampañas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkCampañas | nvarchar | NO |
| ImporteAportacionConces | decimal | YES |
| ImporteAportacionAgente | decimal | YES |
| FechaMod | datetime | NO |
| FechaEnvioMarca | datetime | YES |
| NoModificable | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| PkOfertasCampañas_Iden | smallint | NO |
| FkCampañaTipos | smallint | NO |
| ImporteReclamado | decimal | YES |
| FkImportadoras | int | NO |
| PorcAportacionConces | decimal | YES |
| PorcAportacionAgente | decimal | YES |
| AfectaVenta | bit | NO |
| Observaciones | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
