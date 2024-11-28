# Table: PazSalvoEntregaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoPazSalvoEntrega | nvarchar | NO |
| PkFkSeries_PazSalvoEntrega | nvarchar | NO |
| PkFkNumPazSalvoEntrega | int | NO |
| PkPazSalvoEntregaDet_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| Importe | decimal | NO |
| Fecha | datetime | NO |
| FechaVencimiento | datetime | YES |
| Documento | nvarchar | YES |
| ValorPosfechado | decimal | YES |
| FkRecibos | int | YES |
| FkTerceros_Financiera | int | YES |
| ComisionFinanciera | decimal | YES |
| FkCentros_Anticipo | smallint | YES |
| FkAñoFactura_Anticipo | nvarchar | YES |
| FkSeries_Anticipo | nvarchar | YES |
| FkNumFactura_Anticipo | nvarchar | YES |
| FkAñoAsiento_Origen | nvarchar | YES |
| FkAsientos_Origen | int | YES |
| FkEfectosNumDet_Origen | smallint | YES |
| FkCentros_Atipica | smallint | YES |
| FkAñoFactura_Atipica | nvarchar | YES |
| FkSeries_Atipica | nvarchar | YES |
| FkNumFactura_Atipica | nvarchar | YES |
| FkAñoFactura_CargosAdicionales | nvarchar | YES |
| FkSeries_CargosAdicionales | nvarchar | YES |
| FkNumFactura_CargosAdicionales | nvarchar | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| FkPagoFormas | nvarchar | NO |
| FechaSaldado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
