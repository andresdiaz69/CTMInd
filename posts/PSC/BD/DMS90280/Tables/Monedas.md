# Table: Monedas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkMonedas_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Simbolo | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| DescripcionPlural | nvarchar | NO |
| DescripcionFraccion | nvarchar | YES |
| DescripcionFraccionPlural | nvarchar | YES |
| CodISO4217 | nvarchar | NO |
| FechaMod | datetime | NO |
| DescripcionSoloFraccion | nvarchar | YES |
| DescripcionSoloFraccionPlural | nvarchar | YES |
| DecimalesCalculoMoneda | int | YES |
| DecimalesResultadoMoneda | int | YES |
| CambioFijo | bit | NO |
| Activa | bit | NO |
| FormatoMoneda | nvarchar | NO |
| FormatoMonedaPrecision | nvarchar | NO |
| FormatoMonedaSinSimbolo | nvarchar | NO |
| FormatoMonedaSinSimboloPrecision | nvarchar | NO |
| Observaciones | nvarchar | YES |
| UtilizaFactorCambioIntermedio | bit | NO |
