# Table: EmpresaCentroCajaTpvsRetenciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkFkTarjetaTipos | nvarchar | NO |
| PkEmpresaCentroCajaTpvsRetenciones_Iden | tinyint | NO |
| Porcentaje | decimal | YES |
| FkContCtas | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| RetenerSoloBase | bit | NO |
| FkTipoRetenciones_Interno | tinyint | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| Rec | bit | NO |
| IVA | bit | NO |
| ImporteCobro | bit | NO |
| RetenerCobroParcial | bit | NO |
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
| SumarComision | bit | NO |
| ImporteMax | decimal | YES |
| ImporteMin | decimal | YES |
