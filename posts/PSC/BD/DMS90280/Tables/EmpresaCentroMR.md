# Table: EmpresaCentroMR

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
| PorcMargenPrecioGarantia_Obsoleto | decimal | YES |
| GarantiaPrecioNeto | bit | NO |
| LimiteImportePedidoProveedor | decimal | YES |
| CodConcesionarioRE | nvarchar | YES |
| NombreFicheroPedidoProveedor | nvarchar | YES |
| FkSecciones | int | YES |
| PorcMargenBeneficio | decimal | YES |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | NO |
| CodConcesionarioRE2 | nvarchar | YES |
| DtoCampañaPrioritario | bit | NO |
| CodCentroKPI | nvarchar | YES |
| CodConcesionarioKPI | nvarchar | YES |
| PorcDtoPrecioGarantia_Obsoleto | decimal | YES |
| ModDescRefTA | bit | NO |
| ActualizarPrecioCompra | bit | NO |
| PrecioGarantiaSobrePrecioMedio_Obsoleto | bit | NO |
| NumMaxLineasPedidoAProveedor | smallint | YES |
| PorcMargenBeneficioVentas | decimal | YES |
| ControlStockRefSust | tinyint | NO |
| BaseCalculoPrecioGarantia | tinyint | NO |
| PorcDtoPrecioGarantiaReposicion | decimal | YES |
| PorcCosteGarantia | decimal | YES |
| PorcBeneficioGarantia | decimal | YES |
| BaseCalculoPrecioGarantiaAmpliada | tinyint | NO |
| AplicarDtoVolumen | bit | NO |
| ConfiguracionCentroSapre | tinyint | NO |
| DetCampFactura | bit | NO |
| SerieFacturaCompra | nvarchar | YES |
| SerieFacturaAbono | nvarchar | YES |
| PorcCosteGarantiaAmpliada | decimal | YES |
| PorcBeneficioGarantiaAmpliada | decimal | YES |
| FkLineasDeNegocio | nvarchar | YES |
