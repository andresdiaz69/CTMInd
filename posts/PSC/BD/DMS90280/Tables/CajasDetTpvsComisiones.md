# Table: CajasDetTpvsComisiones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkFkTpvs | smallint | NO |
| PkFkTarjetaTipos | nvarchar | NO |
| PkFkEmpresaCentroCajaTpvsComisiones | tinyint | NO |
| PkCajasDetTpvsComisiones_Iden | tinyint | NO |
| Importe | decimal | YES |
| Porcentaje | decimal | YES |
| FkContCtas | nvarchar | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| IVA | bit | NO |
| ImporteRecibo | bit | NO |
| ImporteEfecto | bit | NO |
| FkRecibos | int | YES |
| FkCajasFacturasDet | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImporteComision | decimal | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkContCtas_IVA | nvarchar | YES |
| PorcIVA | decimal | YES |
| FkAsientos_TarjetaTransitoria | int | YES |
| FkAñoAsiento_TarjetaTransitoria | nvarchar | YES |
