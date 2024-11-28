# Table: CartaPolizas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoCarta | nvarchar | NO |
| PkFkSeries_Carta | nvarchar | NO |
| PkNumCarta | int | NO |
| FkPolizaOperacionTipos | nvarchar | NO |
| FkCtaBancarias | smallint | NO |
| FkPolizasEntidadPago | smallint | YES |
| FkPolizasCuentaPago | smallint | YES |
| FkCtaBancarias_Destino | smallint | YES |
| FechaAlta | datetime | NO |
| FechaValor | datetime | NO |
| FechaImpresion | datetime | YES |
| FechaActualizacionDiseño | datetime | YES |
| FechaAperturaCarta | datetime | YES |
| TotalCarta | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkPolizasCuentaPago_Destino | smallint | YES |
| FkContCtas | nvarchar | YES |
| FkCtaBancarias_Haber | smallint | YES |
| FkMarcas | smallint | YES |
| FkContCtas_Destino | nvarchar | YES |
| FkCtaBancarias_DestinoHaber | smallint | YES |
| FkMarcas_Destino | smallint | YES |
| ImporteContabilizado | decimal | YES |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
