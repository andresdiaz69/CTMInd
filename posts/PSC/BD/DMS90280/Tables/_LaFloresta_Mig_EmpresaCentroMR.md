# Table: _LaFloresta_Mig_EmpresaCentroMR

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMR | nvarchar | NO |
| FkImportadoras | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| CodCentroRE | nvarchar | YES |
| FkTerceros | int | YES |
| SerieEntrada | nvarchar | YES |
| ModificarPrecioGarantia | bit | NO |
| FechaBaja | datetime | YES |
| AccesoWeb | bit | NO |
| PorcMargenPrecioGarantia_Obsoleto | numeric | YES |
| GarantiaPrecioNeto | bit | NO |
| LimiteImportePedidoProveedor | numeric | YES |
| CodConcesionarioRE | nvarchar | YES |
| NombreFicheroPedidoProveedor | nvarchar | YES |
| FkSecciones | int | YES |
| PorcMargenBeneficio | numeric | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| CodConcesionarioRE2 | nvarchar | YES |
| DtoCampañaPrioritario | bit | NO |
| CodCentroKPI | nvarchar | YES |
| CodConcesionarioKPI | nvarchar | YES |
| PorcDtoPrecioGarantia_Obsoleto | numeric | YES |
| ModDescRefTA | bit | NO |
| ActualizarPrecioCompra | bit | NO |
| PrecioGarantiaSobrePrecioMedio_Obsoleto | bit | NO |
| NumMaxLineasPedidoAProveedor | smallint | YES |
| PorcMargenBeneficioVentas | numeric | YES |
| ControlStockRefSust | tinyint | NO |
| BaseCalculoPrecioGarantia | tinyint | NO |
| PorcDtoPrecioGarantiaReposicion | numeric | YES |
| PorcCosteGarantia | numeric | YES |
| PorcBeneficioGarantia | numeric | YES |
| BaseCalculoPrecioGarantiaAmpliada | tinyint | NO |
| AplicarDtoVolumen | bit | NO |
| ConfiguracionCentroSapre | tinyint | NO |
| DetCampFactura | bit | NO |
| SerieFacturaCompra | nvarchar | YES |
| SerieFacturaAbono | nvarchar | YES |
| PorcCosteGarantiaAmpliada | numeric | YES |
| PorcBeneficioGarantiaAmpliada | numeric | YES |
| FkLineasDeNegocio | int | YES |
