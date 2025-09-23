import { ArticleLayout } from '@/components/ArticleLayout'
import type { ArticleWithSlug } from '@/lib/articles'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export const metadata = {
  title: 'Valeurs',
  description:
    "Les valeurs du chêne et ses racines garantissent une prise en compte de chacun et de sa personne, avec bienveillance, pour l’Enfant et pour le Soutien à la Parentalité.",
}

const article: ArticleWithSlug = {
  author: 'Le chêne et ses racines',
  slug: 'valeurs',
  date: '',
  ...metadata,
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>L’enfant</strong> est reconnu dans sa dimension humaine et sociale
        ayant le droit et le besoin fondamental d’avoir accès à chacun de ses
        parents. A travers le contact et la relation avec ses deux parents,
        l’enfant peut se situer dans son histoire et reconnaitre sa place et la
        place de l’autre dans le groupe familial. La reconnaissance de la
        filiation contribue à la construction de l’identité psychique de
        l’enfant, à son bien-être mental et à la prévention de conduites à risque.
      </p>
      <p>
        <strong>Le soutien à la fonction parentale</strong> vise à valoriser les
        parents dans leurs fonctions éducatives. En les aidant à utiliser et
        développer leurs compétences et leurs potentialités d’évolution, nous
        contribuons à ce qu’ils investissent leur rôle éducatif et affectif auprès
        de leur enfant. Ce soutien permettra également de les aider à surmonter
        les difficultés qu’ils pourraient rencontrer dans l’exercice de leurs
        responsabilités parentales. Les psychologues accompagnent également le
        travail de la différenciation entre le couple conjugal et le couple
        parental.
      </p>
      <p>
        Les valeurs fondatrices de l’association sont d’accueillir chacun dans le
        respect de sa personne et de sa culture, avec bienveillance, dans le
        respect de la loi et de la laïcité.
      </p>
      <p>
        Que ce soit suite à une ordonnance judiciaire de placement d’un enfant, ou
        d’un droit de visite pour un parent suite à un conflit, les professionnels
        de l’association s’adaptent aux spécificités judiciaires, besoins et
        caractéristiques de chaque famille pour favoriser l’évolution du lien
        enfant-parent. L’intervention se fait en co-construction avec les
        différents partenaires et dans le respect du cadre judiciaire permettant
        l’évolution la plus pertinente.
      </p>
      <h2>REGLEMENT DE FONTIONNEMENT</h2>
      <p>
        Ce règlement de fonctionnement a été adopté par l’association LE CHÊNE ET
        SES RACINES, pour l’Espace de Rencontre Parents-Enfants. Il s’applique aux
        visiteurs et à l’ensemble du personnel intervenant au sein de
        l’établissement (à titre salarié, libéral ou bénévole).
      </p>
      <ul className="h-[600px] list-none space-y-2 overflow-y-auto rounded-3xl border-2 border-amber-200 bg-amber-50/50">
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Toute personne accueillie l’est dans le respect de la dignité de sa
            personne (Loi du 2 janvier 2002, article L311-31 du CASF). Le centre
            garantit la confidentialité des échanges et des informations
            recueillies. Exceptionnellement, des notes d’information peuvent être
            transmises au juge et dans ce cas les familles sont tenues informées.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Afin de préserver la sécurité des personnes, il est expressément
            demandé de prendre connaissance et de se conformer aux consignes de
            sécurité affichées dans l’établissement.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Il est demandé à chaque personne accueillie, salariée ou bénévole un
            comportement respectueux et civil à l’égard des autres.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Il est demandé aux utilisateurs de rencontrer les intervenants de
            l’Espace de Rencontre Parents-Enfants. Ceux-ci leur expliquent le
            cadre et le fonctionnement de l’établissement. Après un premier
            entretien entre les parents et les professionnels du centre, une
            convention est signée.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Seules les personnes mentionnées dans la décision de justice sont
            autorisées à pénétrer dans l’enceinte de l’Espace de Rencontre. Pour
            d’autres membres, leur accès exceptionnel est possible avec
            l’autorisation expresse des intervenants.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Il est demandé aux personnes en état d’ébriété ou sous l’influence de
            stupéfiants de s’abstenir de pénétrer dans les locaux. A défaut, ils
            seront invités à quitter les lieux.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Il est demandé aux personnes accueillies de rester discrètes vis-à-vis
            des autres.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>Aucun entretien ou aucune visite ne se fait en dehors des heures d’ouverture.</span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Le temps de visite du parent visiteur doit être consacré exclusivement
            au profit de la relation parent-enfant. Les parents doivent respecter
            ce temps et les rendez-vous fixés.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Le parent hébergeant ne peut quitter l’Espace de Rencontre que lorsque
            le parent visitant arrive dans le centre, même si celui-ci arrive avec
            un peu de retard.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            La décision du juge aux Affaires familiales peut préciser que l’enfant
            peut être amené ou recherché par un tiers. Le parent hébergeant
            s’engage alors à fournir par écrit l’identité des personnes qu’il aura
            désignées à cet effet.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Dans le cas d’un enfant malade, ou d’une non-présentation de ce
            dernier, le parent hébergeant doit fournir un certificat médical et la
            visite est rattrapée ultérieurement et il en est de même pour le
            non-respect du calendrier des rencontres. Si le parent non hébergeant
            ne se présente pas, il perd la visite sauf cas de force majeure laissé
            à l’évaluation de l’équipe.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Les parents et les enfants peuvent solliciter des entretiens avec les
            intervenants.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Les sorties à l’extérieur de l’établissement sont autorisées, en
            fonction des ordonnances judiciaires, après évaluation de la relation
            parent-enfant, laquelle s’effectue pendant au minimum trois visites,
            sauf contre-indication expresse, mentionnée dans l’ordonnance du Juge.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Une participation aux frais de fonctionnement (jeux, boissons)
            facultative d’un montant de vingt euros est proposée à chaque parent.
            Les paiements font l’objet d’un reçu.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            L’utilisation des téléphones portables n’est pas autorisée dans le
            centre, sauf cas exceptionnel, après autorisation des intervenants.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Dans le cadre de l’apprentissage à la propreté de jeunes enfants,
            merci de signaler aux intervenants de votre intention de les
            accompagner aux toilettes.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Le centre décline toute responsabilité quant aux objets personnels
            entrés dans l’établissement.
          </span>
        </li>
        <li className="-ml-4 flex items-start">
          <CheckCircleIcon
            aria-hidden="true"
            className="mt-4 mr-2 h-5 w-5 flex-shrink-0 text-green-600 dark:text-white"
          />
          <span>
            Lorsque l’ordre et la tranquillité des personnes accueillies ne sont
            plus assurés du fait des débordements d’une famille, le personnel de
            l’établissement peut recourir aux professionnels de l’urgence, de la
            santé, de la sécurité et en informera le juge.
          </span>
        </li>
      </ul>
    </ArticleLayout>
  )
}
