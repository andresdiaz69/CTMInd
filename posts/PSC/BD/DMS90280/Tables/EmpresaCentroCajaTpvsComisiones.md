# Table: EmpresaCentroCajaTpvsComisiones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkFkTarjetaTipos | nvarchar | NO |
| PkEmpresaCentroCajaTpvsComisiones_Iden | tinyint | NO |
| Porcentaje | decimal | YES |
| FkContCtas | nvarchar | NO |
| Importe | decimal | YES |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| IVA | bit | NO |
| ImporteRecibo | bit | NO |
| ImporteEfecto | bit | NO |
| ComisionCobroParcial | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkCentros | smallint | YES |
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
| ImporteMax | decimal | YES |
| ImporteMin | decimal | YES |
