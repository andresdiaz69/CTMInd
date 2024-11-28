# Table: ComprasTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoExpediente | nvarchar | NO |
| PkFkSeries_Expediente | nvarchar | NO |
| PkFkNumExpediente | int | NO |
| PkFkComprasNumDet | smallint | NO |
| PkFkTerceros | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FacturaRecibida | bit | NO |
| SerieFactura | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| PorcentajeReparto | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceroDirecciones | smallint | NO |
| FkCalleTipos | nvarchar | NO |
| NombreCalle | nvarchar | NO |
| Numero | nvarchar | YES |
| Bloque | nvarchar | YES |
| Piso | nvarchar | YES |
| Puerta | nvarchar | YES |
| Complemento | nvarchar | YES |
| FkPaises | nvarchar | NO |
| FkCodigosPostales | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Provincia | nvarchar | YES |
| FkEstados | nvarchar | YES |
| FkProvincias | nvarchar | YES |
| Complemento2 | nvarchar | YES |
| FacturaEmitida | bit | YES |
| FkTextoSistema_CSW | int | YES |
| FkTextoSistema_TABONOS | int | YES |
