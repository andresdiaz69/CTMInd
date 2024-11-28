# Table: SeccionCargos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSecciones | int | NO |
| PkSeccionCargos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| PrecioHora | decimal | YES |
| PrecioCoste | decimal | YES |
| PorcPM | decimal | YES |
| FkCargoTipos | nvarchar | NO |
| FkTerceros | int | YES |
| ImporteMaxPM | decimal | YES |
| ImporteMinPM | decimal | YES |
| FkImpuestos | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PorDefectoPM | bit | NO |
| EnvioFicheroGarantias | bit | NO |
| ModTercero | bit | NO |
| PMSobreBruto | bit | NO |
| PermitirDtoGarantiA | bit | NO |
| IncluirTasas | bit | NO |
| RequiereHojaTecnicos | bit | NO |
