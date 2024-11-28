# Table: CajasDetTpvsRetenciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkFkTpvs | smallint | NO |
| PkFkTarjetaTipos | nvarchar | NO |
| PkFkEmpresaCentroCajaTpvsRetenciones | tinyint | NO |
| Importe | decimal | NO |
| PorcRetencion | decimal | NO |
| FkContCtas_Retencion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTipoRetenciones_Interno | tinyint | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| Rec | bit | NO |
| IVA | bit | NO |
| ImporteCobro | bit | NO |
| PkCajasDetTpvsRetenciones_Iden | tinyint | NO |
| FkRecibos | int | YES |
| FkCajasFacturasDet | smallint | YES |
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
| FkAsientos_TarjetaTransitoria | int | YES |
| FkAñoAsiento_TarjetaTransitoria | nvarchar | YES |
